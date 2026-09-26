import Link from "next/link";
import en from "@/lib/dictionaries/en";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-navy">{en.notFound.title}</h1>
      <p className="mt-3 text-stone-600">{en.notFound.text}</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-navy px-5 py-2.5 text-white">
        {en.notFound.back}
      </Link>
    </div>
  );
}
