module.exports = function (eleventyConfig) {
  // See https://www.11ty.dev/docs/config/

  eleventyConfig.addPassthroughCopy("assets");

  // You can return your Config object (optional).
  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "_site",
      includes: "includes",
    },
  };
};
