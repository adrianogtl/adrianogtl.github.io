import { DateTime } from "luxon";

export default function (eleventyConfig) {
	// Directory config
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.setOutputDirectory("public");

	// Template formats
	eleventyConfig.setTemplateFormats(["md", "njk"]);

	// CSS
	eleventyConfig.addPassthroughCopy({
		"node_modules/@picocss/pico/css/pico.min.css": "pico.min.css",
	});
	eleventyConfig.addPassthroughCopy("src/style.css");

	// Collections
	eleventyConfig.addCollection("blog", (collection) => {
		return collection.getFilteredByGlob("src/blog/*.md").map((post) => {
			// Post date fallback in case of forget to put the date in the frontmatter
			if (!post.data.date) {
				post.data.date = post.date;
			}
			return post;
		});
	});

	// Filters
	eleventyConfig.addFilter("postDate", (date) => {
		return DateTime.fromJSDate(date).toUTC().toLocaleString(DateTime.DATE_FULL);
	});
	eleventyConfig.addFilter("isoDate", (date) => {
		return DateTime.fromJSDate(date).toUTC().toISO();
	});

	// Shortcodes
	eleventyConfig.addShortcode("year", () => new Date().getFullYear());
}
