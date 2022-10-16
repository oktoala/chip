import Head from "next/head";
import {
  QuestionMark,
  RpIcon,
  ArrowLeft,
  ArrowRight,
  ArrowBoth,
  ScaleIcon,
} from "../components/icons";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import InputNumber from "rc-input-number";

export default function Home() {
  const [harga1, setHarga1] = useState<number | null>(null);
  const [kuantitas1, setKuantitas1] = useState<number | null>(null);
  const [harga2, setHarga2] = useState<number | null>(null);
  const [kuantitas2, setKuantitas2] = useState<number | null>(null);
  const [arrow, setArrow] = useState("question");
  const [text, setText] = useState("Makan");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    const barang1 = harga1! / kuantitas1!;
    const barang2 = harga2! / kuantitas2!;

    if (barang1 < barang2) {
      setArrow("left");
      setText("Barang 1 Lebih Murah");
    } else if (barang1 > barang2) {
      setArrow("right");
      setText("Barang 2 Lebih Murah");
    } else if (barang1 === barang2) {
      setArrow("both");
      setText("Sama aja dua-duanya");
    } else {
      setArrow("question");
    }
  }

  return (
    <>
      <Head>
        <title>Chip - Cari lebih murah</title>
      </Head>
      <main className="bg-zinc-800 ">
        <div className="container mx-auto flex justify-center items-center h-screen">
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center"
          >
            {/* Barang 1 */}
            <div className="flex items-center justify-evenly w-full">
              <div className="Up">
                <p className="font block mb-2 text-md tex-center font-medium text-gray-900 dark:text-gray-300">
                  Barang 1
                </p>
                <Inputan
                  id="harga1"
                  placeholder="Harga 1"
                  onChange={(value) => setHarga1(value)}
                  svg={<RpIcon />}
                  value={harga1}
                />
                <Inputan
                  id="kuantitas1"
                  placeholder="Contoh: Kg, lbs, cm"
                  onChange={(value) => setKuantitas1(value)}
                  svg={<ScaleIcon />}
                  value={kuantitas1}
                />
              </div>
              {/* Panah */}
              <div className="mx-10 md:mx-0 flex flex-col items-center">
                {arrow === "left" && <ArrowLeft />}
                {arrow === "right" && <ArrowRight />}
                {arrow === "both" && <ArrowBoth />}
                {arrow === "question" && <QuestionMark color="stroke-white" />}
                {/* <div className="text-ellipsis text-center text-gray-50 mt-2">{text}</div> */}
              </div>
              {/* Barang 2 */}
              <div id="barang-2">
                <p className="font block mb-2 text-md tex-center font-medium text-gray-900 dark:text-gray-300">
                  Barang 2
                </p>
                <Inputan
                  id="harga2"
                  placeholder="Harga 2"
                  onChange={(value) => setHarga2(value)}
                  svg={<RpIcon />}
                  value={harga2}
                />
                <Inputan
                  id="kuantitas2"
                  placeholder="Contoh: Kg, lbs, cm"
                  onChange={(value) => setKuantitas2(value)}
                  svg={<ScaleIcon />}
                  value={kuantitas2}
                />
              </div>
            </div>
            <button
              type="submit"
              className="max-w-max hover:bg-green-500 bg-green-600 p-5 rounded-xl font-bold text-base text-white"
            >
              Cari Lebih Murah
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

interface InputProps {
  id: string;
  placeholder: string;
  svg: JSX.Element;
  value: number | null;
  onChange: (value: number | null) => void;
}

const Inputan = (props: InputProps) => {
  const { id, placeholder, svg, value, onChange } = props;
  return (
    <div className="relative mb-6 ">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        {svg}
      </div>
      <InputNumber
        aria-label="Controlled number input demonstrating a custom format to add commas"
        id={id}
        placeholder={placeholder}
        value={value}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        onChange={onChange}
        required={true}
      />
      {/* <input
        type="number"
        id={id}
        className="border text-sm rounded-lg block w-full pl-12 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      /> */}
    </div>
  );
};
