import React, { Fragment } from "react";

export default function PageContainer(props: any) {
  return (
    <Fragment>
      <div className="h-12 bg-color-indigo-600" />
      <div className=" flex-col grow mx-auto">{props.children}</div>
    </Fragment>
  );
}
