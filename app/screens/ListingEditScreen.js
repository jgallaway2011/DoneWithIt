import { useEffect, useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";

import { CategoryPickerItem, Screen } from "../components";
import {
  Form,
  FormField,
  FormImagePicker,
  FormPicker,
  SubmitButton,
} from "../components/forms";
import { categoriesAPI, listingsAPI } from "../api";
import { useAPI, useLocation } from "../hooks";
// import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
  images: Yup.array().min(1, "Please select ast least one image."),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  title: Yup.string().required().min(1).label("Title"),
});

function ListingEditScreen() {
  const location = useLocation();
  const getCategoriesAPI = useAPI(categoriesAPI.getCategories);

  useEffect(() => {
    getCategoriesAPI.request();
  }, []);

  // const [uploadVisible, setUploadVisible] = useState(false);
  // const [progress, setProgress] = useState(0);

  // const handleSubmitTest = async (listing) => {
  //   const result = await listingsAPI.addListingTest({ ...listing, location });
  // };

  const handleSubmit = async (listing, { resetForm }) => {
    // setProgress(0);
    // setUploadVisible(true);
    const result = await listingsAPI.addListing({ ...listing, location });

    if (!result.ok) {
      // setUploadVisible(false);
      return alert("Could not save the listing.");
    }

    resetForm();
  };

  return (
    <Screen>
      {/* <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      /> */}
      <Form
        initialValues={{
          category: null,
          description: "",
          images: [],
          price: "",
          title: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField
          icon="card-text-outline"
          maxLength={255}
          name="title"
          placeholder="Title"
        />
        <View style={{ flexDirection: "row" }}>
          <FormField
            icon="currency-usd"
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            marginRight={15}
            width="45%"
          />
          <FormPicker
            icon="apps"
            items={getCategoriesAPI?.data}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="50%"
          />
        </View>
        <FormField
          icon="card-text-outline"
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="post" />
      </Form>
    </Screen>
  );
}

export default ListingEditScreen;
