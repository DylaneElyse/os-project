import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-10 items-center flex-col sm:flex-col">
          <p className="text-2xl font-bold">Welcome to the Inventory App</p>
          <form className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">Item Name:</label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item name"
            />
            <label htmlFor="email" className="text-sm font-semibold">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
