import { ProductsModel } from "../models/Products.Model.js";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "../utils/Firebase.js";
import { setMongoose } from "../utils/Mongoose.js";

export const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      sale_price,
      stock,
      category,
      latest,
      product_code,
    } = req.body;
    if (!name || !description || !price || !stock || !category || !product_code)
      throw new Error("Please provide all required fields");

    if (parseFloat(price) <= 0) {
      throw new Error("Price must be greater than 0");
    }
    if (parseFloat(stock) <= 0) {
      throw new Error("Stock must be greater than 0");
    }

    if (parseFloat(sale_price) && parseFloat(sale_price) < 0) {
      throw new Error("Sale price must be 0 or greater");
    }
    if (parseFloat(sale_price) >= parseFloat(price)) {
      throw new Error("Sale price must be less than the original price");
    }
    if (parseFloat(sale_price) <= 0 && parseFloat(price) <= 0) {
      throw new Error("Both Sale price and Price cannot be 0");
    }

    const { primary, image2, image3, image4 } = req.files;
    if (!primary) throw new Error("Please provide a primary file");
    if (!image2) throw new Error("Please provide a file2 file");
    if (!image3) throw new Error("Please provide a file3 file");
    if (!image4) throw new Error("Please provide a file4 file");
    const uploadPromises = [
      uploadImageToFirebase(primary[0], "Googly Images"),
      uploadImageToFirebase(image2[0], "Googly Images"),
      uploadImageToFirebase(image3[0], "Googly Images"),
      uploadImageToFirebase(image4[0], "Googly Images"),
    ];
    const results = await Promise.all(uploadPromises);
    const imageData = results.map((result) => ({
      downloadURL: result.downloadURL,
      name: result.name,
      type: result.type,
    }));
    await ProductsModel.create({
      name,
      description,
      price,
      stock,
      images: {
        primary: imageData[0],
        image2: imageData[1],
        image3: imageData[2],
        image4: imageData[3],
      },
      category,
      sale_price,
      latest,
      product_code,
    });
    return res.status(200).json({ message: "Product Added Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const {
      productId,
      name,
      description,
      price,
      sale_price,
      stock,
      category,
      subCategory,
      latest,
      product_code,
    } = req.body;
    const product = await ProductsModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (parseFloat(price) <= 0) {
      throw new Error("Price must be greater than 0");
    }
    if (parseFloat(stock) <= 0) {
      throw new Error("Stock must be greater than 0");
    }

    if (parseFloat(sale_price) && parseFloat(sale_price) < 0) {
      throw new Error("Sale price must be 0 or greater");
    }
    if (parseFloat(sale_price) >= parseFloat(product.price)) {
      throw new Error("Sale price must be less than the original price");
    }
    if (parseFloat(sale_price) <= 0 && parseFloat(price) <= 0) {
      throw new Error("Both Sale price and Price cannot be 0");
    }

    let updateQuery = {};
    if (name) {
      updateQuery = { ...updateQuery, name };
    }
    if (description) {
      updateQuery = { ...updateQuery, description };
    }
    if (product_code) {
      updateQuery = { ...updateQuery, product_code };
    }
    if (price) {
      updateQuery = { ...updateQuery, price };
    }
    if (sale_price) {
      updateQuery = { ...updateQuery, sale_price };
    }
    if (stock) {
      updateQuery = { ...updateQuery, stock };
    }
    if (category) {
      updateQuery = { ...updateQuery, category };
    }
    if (subCategory) {
      updateQuery = { ...updateQuery, subCategory };
    }
    if (latest) {
      updateQuery = { ...updateQuery, latest };
    }
    let deletePromises = [];
    let imageData = { ...product.images };
    const { primary, image2, image3, image4 } = req.files;
    if (primary || image2 || image3 || image4) {
      const uploadPromises = [
        primary ? uploadImageToFirebase(primary[0], "Googly Images") : null,
        image2 ? uploadImageToFirebase(image2[0], "Googly Images") : null,
        image3 ? uploadImageToFirebase(image3[0], "Googly Images") : null,
        image4 ? uploadImageToFirebase(image4[0], "Googly Images") : null,
      ];

      const results = await Promise.all(uploadPromises);

      if (primary) {
        const primaryResult = results[0];
        if (primaryResult) {
          imageData.primary = {
            downloadURL: primaryResult.downloadURL,
            name: primaryResult.name,
            type: primaryResult.type,
          };
          if (
            primaryResult.downloadURL !== product.images.primary.downloadURL
          ) {
            deletePromises.push(
              deleteImageFromFirebase(product.images.primary.downloadURL)
            );
          }
        }
      }

      if (image2) {
        const image2Result = results[1];
        if (image2Result) {
          imageData.image2 = {
            downloadURL: image2Result.downloadURL,
            name: image2Result.name,
            type: image2Result.type,
          };
          if (image2Result.downloadURL !== product.images.image2.downloadURL) {
            deletePromises.push(
              deleteImageFromFirebase(product.images.image2.downloadURL)
            );
          }
        }
      }

      if (image3) {
        const image3Result = results[2];
        if (image3Result) {
          imageData.image3 = {
            downloadURL: image3Result.downloadURL,
            name: image3Result.name,
            type: image3Result.type,
          };
          if (image3Result.downloadURL !== product.images.image3.downloadURL) {
            deletePromises.push(
              deleteImageFromFirebase(product.images.image3.downloadURL)
            );
          }
        }
      }

      if (image4) {
        const image4Result = results[3];
        if (image4Result) {
          imageData.image4 = {
            downloadURL: image4Result.downloadURL,
            name: image4Result.name,
            type: image4Result.type,
          };
          if (image4Result.downloadURL !== product.images.image4.downloadURL) {
            deletePromises.push(
              deleteImageFromFirebase(product.images.image4.downloadURL)
            );
          }
        }
      }

      await Promise.all(deletePromises);

      updateQuery.images = imageData;
    }

    if (Object.keys(updateQuery).length === 0)
      throw new Error("No fileds Updated");
    await ProductsModel.findByIdAndUpdate({ _id: productId }, updateQuery);
    return res.status(200).json({ success: true, message: "Product Updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Product Id not Found");
    const product = await ProductsModel.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    let deletePromises = [];
    deletePromises.push(
      deleteImageFromFirebase(product.images.primary.downloadURL)
    );
    deletePromises.push(
      deleteImageFromFirebase(product.images.image2.downloadURL)
    );
    deletePromises.push(
      deleteImageFromFirebase(product.images.image3.downloadURL)
    );
    deletePromises.push(
      deleteImageFromFirebase(product.images.image4.downloadURL)
    );
    await Promise.all(deletePromises);
    await ProductsModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Deleted Succesfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getLatestPRoducts = async (req, res, next) => {
  try {
    const products = await ProductsModel.aggregate([
      { $match: { latest: true } },
      { $sample: { size: 12 } },
    ]);
    setMongoose();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    let search = req.query.search || "";
    let category = req.query.category || "All";
    let latest = req.query.latest === "true";
  
    let query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { product_code: { $regex: search, $options: "i" } }
      ]
    };

    if (category !== "All") {
      query.category = category;
    }
    if (latest === true) {
      query.latest = latest;
    }
    const productData = await ProductsModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await ProductsModel.countDocuments(query);

    const response = {
      totalPages: Math.ceil(total / limit),
      page,
      productData,
    };
    setMongoose();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Product Id Required");
    const product = await ProductsModel.findById(id);
    setMongoose();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
