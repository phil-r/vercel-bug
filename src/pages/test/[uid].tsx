import React from "react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";

// export default function Page() {
//   return <Link href="/dashboard">Dashboard</Link>
// }

export const Page: React.FC<{ data: string }> = ({ data }) => {
  return (
    <div>
      <span>Hey, I$apos;m data</span>
      <br />
      <span>I was generated {data} times</span>
      <br />
      <Link href="/test/ccc">ccc</Link>
      <br />
      <Link href="/test/bbb">bbb</Link>
    </div>
  );
};

const iterator: Record<string, string> = {};

export const getStaticProps: GetStaticProps<
  { data: string },
  { uid: string }
> = (context) => {
  if (!context?.params?.uid) {
    return { props: { data: "I did not receive uid" } };
  }

  console.error("generating ", context.params.uid);

  const data = iterator[context.params.uid] ?? 1;
  iterator[context.params.uid] = data + 1;
  return { props: { data: data } };
};

export const getStaticPaths: GetStaticPaths = () => {
  return Promise.resolve({
    paths: [{ params: { uid: "aaa" } }, { params: { uid: "bbb" } }],
    fallback: "blocking",
  });
};

export default Page;
