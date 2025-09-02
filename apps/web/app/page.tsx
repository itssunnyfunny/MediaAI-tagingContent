import "./globals.css";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Button2 } from "@repo/ui/Button2";
import styles from "./page.module.css";
import { Card } from "@repo/ui/card";
import Upload from "../components/upload";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-500 text-2xl font-bold">
      <Upload /> 
    </div>
    
  );
}
