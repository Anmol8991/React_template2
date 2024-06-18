import { Widget } from "@/components/common/Widget";
import * as React from "react";
import ErrorBox from "./ErrorBox";
import Loader from "./Loader";

export const WidgetList = ({
  widgetsData,
  xl,
  md,
  sm,
  loading,
  error,
  flex,
  className = "",
}) => {
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorBox error={error} />;
  }
  return (
    <>
      {widgetsData?.map((item, index) => (
        <Widget
          key={index}
          item={item}
          index={index}
          xl={xl}
          md={md}
          sm={sm}
          flex={flex}
          className={className}
        />
      ))}
    </>
  );
};
