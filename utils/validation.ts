import * as Yup from "yup";

const MAX_SONG_SIZE = 10240000; //10Mb
const MAX_IMAGE_SIZE = 1024000; //1Mb

export const uploadModalSchema = Yup.object().shape({
  title: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  author: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  song: Yup.mixed<File>().test(
    "song",
    "Max allowed size is 5Mb",
    value => value && value.size <= MAX_SONG_SIZE
  ),
  image: Yup.mixed<File>().test(
    "image",
    "Max allowed size is 1Mb",
    value => value && value.size <= MAX_IMAGE_SIZE
  ),
});
