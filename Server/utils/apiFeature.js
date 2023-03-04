class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    console.log(this.query);
    // console.log("check", this.queryStr);
    let keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log(" keyword:", keyword);
    this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };
    // console.log("qryStrCopy", queryStrCopy);
    let removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete queryStrCopy[field]);
    // console.log(" removeFields:", queryStrCopy);
    let queryStrPrice = JSON.stringify(queryStrCopy);
    queryStrPrice = queryStrPrice.replace(
      /\b(gt|gte|lte|lt)/g,
      (match) => `$${match}`
    );
    // console.log("queryStrPrice:", JSON.parse(queryStrPrice));
    this.query.find(JSON.parse(queryStrPrice));
    return this;
  }
  paginate(resPerPage) {
    console.log("resPerPage", resPerPage);
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * currentPage - 1;
    this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = { APIFeatures };
