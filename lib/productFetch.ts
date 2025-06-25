export const productFetch = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await res.json();
    return result.data;
  } catch (error: any) {
    console.log("Error in fetching products: ", error.message);
    return [];
  }
};
