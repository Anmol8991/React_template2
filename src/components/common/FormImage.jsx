import React from "react";
import defaultImage from "../../assets/images/defaultImage.png";
const FormImage = (props) => {
  // const imageRegex = /\.(jpeg|jpg|gif|png)$/i; // regular expression to match common image file extensions

  // function isImageUrl(str) {
  //   return imageRegex.test(str);
  // }
  return (
    <div className="form-label fs-5 d-flex flex-column justify-content-center align-items-center">
      <div
        className={`rounded-circle border border-2 border-primary ${
          props.isSmall ? "formImageSmallContainer" : "formImageContainer"
        } position-relative cursor-pointer`}
      >
        {/* {props.image ? ( */}
        <img
          src={
            props.image
              ? typeof props.image === "object"
                ? URL.createObjectURL(props.image)
                : props.image
              : defaultImage
          }
          style={{ objectFit: "cover", objectPosition: "top" }}
          className={
            props.image ? "w-100 h-100 rounded-circle p-1" : "w-100 h-100 p-3"
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = defaultImage;
          }}
        />

        {/* // ) : (
        //   <img
        //     src={defaultImage}
        //     style={{ objectFit: "cover" }}
        //     className="w-100 h-100 p-3"
        //     onError={({ currentTarget }) => {
        //       currentTarget.onerror = null; // prevents looping
        //       currentTarget.src = defaultImage;
        //     }}
        //   />
        // )} */}

        <label
          className="position-absolute fs-6 h-100 w-100 imgLabel"
          htmlFor="logoInput"
        >
          Choose Image
        </label>
      </div>
      <span className="mt-2">{props.label}</span>

      <span className="mt-4 text-muted fs-6 w-75 mx-auto d-flex justify-content-center">
        <ul>
          <li>Only JPG, JPEG and PNG accepted</li>
          <li>Max image size should be 1MB</li>
          <li>Select 300 x 300 size image</li>
        </ul>
      </span>
      <input
        type="file"
        className="d-none"
        id="logoInput"
        accept=".jpg,.jpeg,.png"
        onChange={props.onChange}
      />
    </div>
  );
};

export default FormImage;
