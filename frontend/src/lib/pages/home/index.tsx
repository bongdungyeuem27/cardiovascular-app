import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  Text,
  chakra,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { omit } from "lodash"
import { useState } from "react"
import { Controller, type FieldErrors, useForm } from "react-hook-form"
import { BsFillTrash2Fill } from "react-icons/bs"
import { z } from "zod"
import { enums } from "../../../../wailsjs/go/models"
import { Predict } from "../../../../wailsjs/go/predict/App"

type IForm = {
  gioi_tinh: 0 | 1 | 2 | ""
  tuoi: number | "" // 0 -> 100
  so_nam_dtd: number | "" // 0 -> 100
  tang_huyet_ap: boolean
  roi_loan_lipid: boolean
  benh_vong_mac: boolean
  benh_than: boolean
  dot_quy: boolean
  thuoc_la: 0 | 1 | 2 | ""
  ruou_bia: 0 | 1 | 2 | ""
  dieu_tri_huyet_ap: boolean
  hba1c: number | "" // 0 -> 100
  creatinin: number | "" // 0 -> 100
  egfr: number | "" // 0 -> 100
  dieu_tri_statin: boolean
  dieu_tri_insulin: boolean
  kham_ban_chan_phai: 0 | 1 | 2 | ""
  kham_ban_chan_trai: 0 | 1 | 2 | ""
  tien_su_dtd_gd: boolean
  tien_can_nhoi_mau: boolean
}

const EMAP = Object.freeze({
  [enums.ELabel.Medium]: "Nguy cơ trung bình",
  [enums.ELabel.High]: "Nguy cơ cao",
  [enums.ELabel.Danger]: "Nguy cơ rất cao",
}) as {
  [key in enums.ELabel]: string
}

const schema = z.object({
  gioi_tinh: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  tuoi: z.number().min(0).max(100),
  so_nam_dtd: z.number().min(0).max(100),
  tang_huyet_ap: z.boolean(),
  roi_loan_lipid: z.boolean(),
  benh_vong_mac: z.boolean(),
  benh_than: z.boolean(),
  dot_quy: z.boolean(),
  thuoc_la: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  ruou_bia: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  dieu_tri_huyet_ap: z.boolean(),
  hba1c: z.number().min(0).max(100),
  creatinin: z.number().min(0).max(100),
  egfr: z.number().min(0).max(100),
  dieu_tri_statin: z.boolean(),
  dieu_tri_insulin: z.boolean(),
  kham_ban_chan_phai: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  kham_ban_chan_trai: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  tien_su_dtd_gd: z.boolean(),
  tien_can_nhoi_mau: z.boolean(),
})

const Home = () => {
  const [result, setResult] = useState<enums.ELabel>()
  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      gioi_tinh: "",
      tuoi: "",
      so_nam_dtd: "",
      tang_huyet_ap: false,
      roi_loan_lipid: false,
      benh_vong_mac: false,
      benh_than: false,
      dot_quy: false,
      thuoc_la: "",
      ruou_bia: "",
      dieu_tri_huyet_ap: false,
      hba1c: "",
      creatinin: "",
      egfr: "",
      dieu_tri_statin: false,
      dieu_tri_insulin: false,
      kham_ban_chan_phai: "",
      kham_ban_chan_trai: "",
      tien_su_dtd_gd: false,
      tien_can_nhoi_mau: false,
    },
    resolver: zodResolver(schema),
  })

  const onValid = async (data: IForm) => {
    await Predict([
      Number(data.gioi_tinh || 0),
      Number(data.tuoi || 0),
      Number(data.so_nam_dtd || 0),
      +data.tang_huyet_ap,
      +data.roi_loan_lipid,
      +data.benh_vong_mac,
      +data.benh_than,
      +data.tien_can_nhoi_mau,
      +data.dot_quy,
      Number(data.thuoc_la || 0),
      Number(data.ruou_bia || 0),
      +data.dieu_tri_insulin,
      +data.dieu_tri_huyet_ap,
      +data.dieu_tri_statin,
      Number(data.kham_ban_chan_phai || 0),
      Number(data.kham_ban_chan_trai || 0),
      +data.tien_su_dtd_gd,
      Number(data.hba1c || 0),
      Number(data.creatinin || 0),
      Number(data.egfr || 0),
    ])
      .then((res) => {
        console.log(res)
        setResult(res.body as never)
        if (Object.keys(EMAP).includes(res.body as never)) {
          setResult(EMAP[res.body as never])
        }
      })
      .catch(console.log)
  }

  const onInValid = (errors: FieldErrors<IForm>) => {
    console.log(errors)
  }

  return (
    <Flex width="full" flexDirection="column" gap={8}>
      <HStack justifyContent="center">
        {/* <Text fontSize="4xl">Dự đoán nguy cơ đái tháo đường</Text> */}
      </HStack>

      <HStack
        spacing={8}
        backgroundColor="rgb(224, 92, 109)"
        rounded="xl"
        justifyContent="space-around"
      >
        <Image
          src="https://ftisu.vn/_nuxt/ecg_2l.3631d8cf.png"
          boxSize="8rem"
        />
        <Text color="white" fontSize="3xl" textAlign="center">
          Phân tầng nguy cơ tim mạch <br />​ trên người bệnh đái tháo đường típ
          2​
        </Text>
        <Image
          src="https://ftisu.vn/_nuxt/ecg_2r.779375f6.png"
          boxSize="8rem"
        />
      </HStack>

      <chakra.form
        display="flex"
        flexDirection="column"
        gap={4}
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <HStack spacing={4}>
          <IconButton
            aria-label="Reset"
            boxSize="2.5rem"
            colorScheme="red"
            padding={2}
            rounded="full"
            type="button"
            icon={
              <BsFillTrash2Fill
                fill="white"
                style={{
                  borderRadius: "100%",
                  width: "100%",
                  height: "100%",
                }}
              />
            }
            onClick={() => {
              console.log("reset")

              reset(
                {
                  gioi_tinh: "",
                  tuoi: "",
                  so_nam_dtd: "",
                  tang_huyet_ap: false,
                  roi_loan_lipid: false,
                  benh_vong_mac: false,
                  benh_than: false,
                  dot_quy: false,
                  thuoc_la: "",
                  ruou_bia: "",
                  dieu_tri_huyet_ap: false,
                  hba1c: "",
                  creatinin: "",
                  egfr: "",
                  dieu_tri_statin: false,
                  dieu_tri_insulin: false,
                  kham_ban_chan_phai: "",
                  kham_ban_chan_trai: "",
                  tien_su_dtd_gd: false,
                  tien_can_nhoi_mau: false,
                },
                {
                  keepDirtyValues: false,
                  keepErrors: false,
                  keepDirty: false,
                  keepValues: false,
                  keepDefaultValues: false,
                  keepIsSubmitted: false,
                  keepIsSubmitSuccessful: false,
                  keepTouched: false,
                  keepIsValidating: false,
                  keepIsValid: false,
                  keepSubmitCount: false,
                },
              )
            }}
          />
        </HStack>
        <Controller
          control={control}
          name="gioi_tinh"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Giới tính</Text>
                <Select
                  {...field}
                  placeholder="Chọn giới tính"
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                >
                  <option value={0}>Nam</option>
                  <option value={1}>Nữ</option>
                  <option value={2}>Khác</option>
                </Select>
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="tuoi"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Tuổi</Text>
                <Input
                  type="number"
                  placeholder="Nhập tuổi"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                />
              </HStack>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="so_nam_dtd"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Số năm đái tháo đường</Text>
                <Input
                  type="number"
                  placeholder="Nhập số năm đái tháo đường"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                />
              </HStack>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="tang_huyet_ap"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Tăng huyết áp</Text>
                <Checkbox
                  {...omit(field, "value")}
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </HStack>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="roi_loan_lipid"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Rối loạn lipid</Text>
                <Checkbox
                  {...omit(field, "value")}
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </HStack>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="benh_vong_mac"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Bệnh vòng mạch</Text>
                <Checkbox
                  {...omit(field, "value")}
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="benh_than"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Bệnh thận</Text>
                <Checkbox
                  {...omit(field, "value")}
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </HStack>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="dot_quy"
          render={({ field }) => (
            <HStack spacing={4}>
              <Text whiteSpace="nowrap">Đột quỵ</Text>
              <Checkbox
                {...omit(field, "value")}
                isChecked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            </HStack>
          )}
        />

        <Controller
          control={control}
          name="thuoc_la"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Hút thuốc lá</Text>
                <Select
                  placeholder="Chọn hút thuốc lá"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                >
                  <option value={0}>Không</option>
                  <option value={1}>Có</option>
                  <option value={2}>Chưa biết</option>
                </Select>
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="ruou_bia"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Uống rượu bia</Text>
                <Select
                  placeholder="Chọn uống rượu bia"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                >
                  <option value={0}>Không</option>
                  <option value={1}>Có</option>
                  <option value={2}>Chưa biết</option>
                </Select>
              </HStack>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="dieu_tri_huyet_ap"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Điều trị tăng huyết áp</Text>
                <Checkbox
                  {...omit(field, "value")}
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="hba1c"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">HbA1c (Chỉ số đường huyết)</Text>
                <Input
                  type="number"
                  placeholder="Nhập chỉ số HbA1c"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                />
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="creatinin"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Creatinin</Text>
                <Input
                  type="number"
                  placeholder="Nhập chỉ số Creatinin"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                />
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="egfr"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">eGFR</Text>
                <Input
                  placeholder="Nhập chỉ số eGFR"
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                />
              </HStack>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="dieu_tri_statin"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Điều trị statin</Text>
                <Checkbox
                  {...omit(field, "value")}
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </HStack>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="dieu_tri_insulin"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Điều trị insulin</Text>
                <Checkbox
                  {...omit(field, "value")}
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="kham_ban_chan_phai"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Khám bàn chân phải</Text>
                <Select
                  placeholder="Chọn khám bàn chân phải"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                >
                  <option value={0}>Không</option>
                  <option value={1}>Có</option>
                  <option value={2}>Chưa biết</option>
                </Select>
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="kham_ban_chan_trai"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Khám bàn chân trái</Text>
                <Select
                  placeholder="Chọn khám bàn chân trái"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value) > 0 ? Number(e.target.value) : "",
                    )
                  }
                >
                  <option value={0}>Không</option>
                  <option value={1}>Có</option>
                  <option value={2}>Chưa biết</option>
                </Select>
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="tien_su_dtd_gd"
          render={({ field, fieldState: { error } }) => (
            <FormControl
              isInvalid={Boolean(error)}
              flexDirection="column"
              gap={1}
            >
              <HStack spacing={4}>
                <Text whiteSpace="nowrap">Tiền sử đái tháo đường gia đình</Text>
                <Checkbox
                  {...omit(field, "value")}
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </HStack>

              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Button alignSelf="flex-start" colorScheme="blue" type="submit">
          Tính toán
        </Button>

        <HStack spacing={4}>
          <Text whiteSpace="nowrap">Kết quả:</Text>
          <Text>{result || "..."}</Text>
        </HStack>
      </chakra.form>
    </Flex>
  )
}

export default Home
