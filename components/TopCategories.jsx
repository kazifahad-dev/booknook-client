import Link from "next/link";
import {
  FaFeatherAlt,
  FaFlask,
  FaLandmark,
  FaChild,
  FaLayerGroup,
} from "react-icons/fa";

const categories = [
  { name: "Fiction", icon: FaFeatherAlt, text: "Stories and novels" },
  { name: "Science", icon: FaFlask, text: "Ideas that explain the world" },
  { name: "History", icon: FaLandmark, text: "Lives and times gone by" },
  { name: "Kids", icon: FaChild, text: "Books for young readers" },
  { name: "Others", icon: FaLayerGroup, text: "Everything else on the shelf" },
];

export default function TopCategories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">Top Categories</h2>
        <p className="mt-2 opacity-80">Find your next read by what you love</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href="/books"
              className="flex h-full flex-col items-center rounded-xl border border-base-300 bg-base-100 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary"
            >
              <Icon className="text-3xl text-primary" />
              <h3 className="mt-3 text-lg font-bold">{cat.name}</h3>
              <p className="mt-1 text-sm opacity-70">{cat.text}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}