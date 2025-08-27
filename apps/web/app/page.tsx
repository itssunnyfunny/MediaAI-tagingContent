import "./globals.css";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Button2 } from "@repo/ui/Button2";
import styles from "./page.module.css";
import { Card } from "@repo/ui/card";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-500 text-2xl font-bold">
      hello world
      <Button appName="web">Click me</Button> 
      <Card title="Hello" href="https://www.google.com"> <p>Hello</p></Card>
      <Button2>Click me</Button2>
    </div>
    
  );
}
