import React, { Fragment } from "react";

export default function PageContainer(props: any) {
  return (
    <Fragment>
      <div className="shrink-0 h-5 bg-slate-800 sticky top-0" />
      <div className="flex flex-col grow w-full my-0 mx-auto pb-36">
        {props.children}
      </div>
    </Fragment>
  );
}
