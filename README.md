# 11ty Theme Conversion

Building on Bryan Robinson's Eleventy theme construction tutorial

- [11ty Theme Conversion](#11ty-theme-conversion)
  - [The plan](#the-plan)
    - [Original](#original)
    - [Revisited](#revisited)
  - [Configuration](#configuration)
  - [Test initial setup](#test-initial-setup)
  - [Base Template](#base-template)
  - [Reusable Content Template](#reusable-content-template)
  - [Collections](#collections)
  - [Custom Homepage](#custom-homepage)
  - [Deployment](#deployment)
  - [API Based Contact Page](#api-based-contact-page)
  - [CMS](#cms)
  - [Automation](#automation)

A step-by-step, pedagogically documented journey building upon Bryan Robinson's excellent May, 2019 Video Tutorial [Create an Eleventy (11ty) theme based on a free HTML template](https://bryanlrobinson.com/blog/create-11ty-theme-from-static-html-template/) as a starting point.

However, we will be adding an essential missing ingredient to the mix, one that Bryan Robinson mentions himself in [Three JAMstack movements to watch in 2020](https://bryanlrobinson.com/blog/three-jamstack-concepts-to-watch-in-2020/):

> ### A DIY movement reinvigorated
>
> The JAMstack is a great place to be a DIYer. Building things yourself is a path to great satisfaction. With little-to-no cost to build and host small applications, the JAMstack is really a no-brainer for a DIY or Indie movement.

## The plan

### Original

In the introductory [Eleventy (11ty) Static HTML Theme Conversion Introduction](https://youtu.be/z-o1W9ijUhI) video kicking off the series, four stages are planned for:

- Stage 1: Configuration
  - Set up and configure eleventy
  - Set up and configure the base templates for our site content
- Stage 2: Data conversion
  - From HTML to collections and global data objects
- Stage 3: Deployment
  - Netlify deployment
  - Use of Netlify forms for user interaction
- Stage 4: CMS
  - Hook into Netlify CMS (a GitHub based CMS)
  - Create editorial workflow for content managers

### Revisited

- Stage 1: Configuration
  - We'll add Git repositories
    - Local for development
    - Then, in later stages (see Deploy)
      - Staging repo
        For ease of use we always push to master
        Then, staging is updated via automation (automatic pull)
      - Production repo
        For ease of use we always push to master of this repo to publish
        Then, production is updated via automation (automatic pull)
- Stage 2: Data conversion
  - Initially no changes
  - Either immediately afterwards, or in a later iteration
    we use a backend to centralize and expose our structured content
    for this and multiple apps
- Stage 3: Deployment
  - Self-hosting, avoiding paywalls and owning our stuff
  - Single-click Node.js server on DigitalOcean
  - Use of bare repos for staging and production
    automated via git hooks
- Stage 4: CMS
  - Hook into an open source (not just free) markdown editor
  - Organize content source files
  - Set up editorial workflow for content managers
  - Editing comes with instant preview
    plus buttons for staging and for publishing
  - Content Workflow Automation

## Configuration

- The theme
  - [Flat Theme Lite - Free Responsive Multipurpose Site Template](https://themehunt.com/item/1524965-flat-theme-lite-free-responsive-multipurpose-site-template)
    - [Live preview](http://themehunt.com/item/1524965-flat-theme-lite-free-responsive-multipurpose-site-template/preview)
  - copy over initial theme files
    - copy over `./assets`
      - TODO sass and a watcher to modify base theme assets
    - copy over additional files as per planned structure
      - homepage: `index2.html`
      - services section: `service.html`
      - about page: `about.html`
      - testimonials page: `testimonial.html`
      - contact page: `contact.html`
      - 404 page: `404.html`
    - `index2.html` => `index.html
    - view in browser as static file and it works with the pages we have,
      including carousel on testimonials page
- Install 11ty as per [Getting Started docs](https://www.11ty.dev/docs/getting-started/)
  - Initialize the project with the Node package manager `npm init -y`
  - Install `eleventy` locally `npm install --save-dev @11ty/eleventy`
  - Confirm version with `npx @11ty/eleventy --version` (`0.11.0` at time of writing)
- Eleventy configuration
  - See https://www.11ty.dev/docs/config/
  - Our file `.eleventy.js`
    ```javascript
    module.exports = function (eleventyConfig) {
      // See https://www.11ty.dev/docs/config/
      eleventyConfig.addPassthroughCopy("assets");
      // You can return your Config object (optional).
      return {
        passthroughFileCopy: true,
        dir: {
          input: "src",
          output: "_site",
          includes: "includes",
        },
      };
    };
    ```

## Test initial setup

- Run eleventy: `npx eleventy --serve`
  ```bash
  % npx eleventy --serve
  Copied 143 files / Wrote 0 files in 1.27 seconds (v0.11.0)
  Watching…
  [Browsersync] Access URLs:
   --------------------------------------
         Local: http://localhost:8080
      External: http://192.168.0.221:8080
   --------------------------------------
            UI: http://localhost:3001
   UI External: http://localhost:3001
   --------------------------------------
  [Browsersync] Serving files from: _site
  ```
- Only `./assets` got copied into the output directory
  because we don't have oour source directory set up yet.
  To do that we create a `./src` directory
  and copy the page files into it (index, about, etc.)
- Now everything is running since we left eleventy running in serve mode
  and it detected and acted upon the file changes
- Pointing our browser at http://localhost:8080/,
  we can visualize our homepage just fine
- See commit [feat(eleventy): Set up and configure eleventy](https://github.com/demystifying-dev/11ty-theme-conversion/commit/9aa30636a8ee4044d7b39b19f4f63dba09680a72)
- We make another [commit so as not to track the output dir](https://github.com/demystifying-dev/11ty-theme-conversion/commit/f7ad75ee64f5eb809ffd56b3a9cfab080e9221b1)

## Base Template

- We are going to create a layout template that every page will inherit from
  > You're going to want to abstract out any values  
  > that are going to be global to each page ([Original tutorial video](https://youtu.be/iWivBpYmOaQ))
- The base template is to be found at `./src/includes/base.njk`
- We'll start with `about.html`
  - We cut the top part of the file all the way down to and including the header
  - We cut the bottom part of the file all the way up to the start of the footer
  - We paste both the top and bottom parts into `base.njk`, leaving a space in between
  - Edit `src` file references to be relative to the root path instead of a subdir
    Example:
    From: `<script src="assets/js/jquery-2.2.4.min.js"></script>`
    To: `<script src="/assets/js/jquery-2.2.4.min.js"></script>`
  - Add passthrough info and expected formats to eleventy config file
  - Have `about` invoke the base template `base.njk`
  - Specify in our base template an area where content will be included
    in the space we left between the header and the footer, with
    `{{ content | safe }}`, following the `{{ variable | filter }}` mode explained [in the docs](https://www.11ty.dev/docs/languages/nunjucks/#filters)
  - Test so far by manually directing our browser at http://localhost:8080/about/.
  - Commit [feat(base template): Base template, first version](https://github.com/demystifying-dev/11ty-theme-conversion/commit/065a69e7cdc194db2566d38517cfa5238e34033d)
- We re-use our new inheritable base template now for the remaining pages: contact, index, service and testimonial For each page, we
  - Remove header and footer
  - Add form matter to the top
    ```yaml
    ---
    layout: "base.njk"
    ---

    ```
  - Make sure `src` and `href` links take the path from site document root. Example:
    From: `<script src="assets/js/jquery-2.2.4.min.js"></script>`
    To: `<script src="/assets/js/jquery-2.2.4.min.js"></script>`
- Each page works if we invoke them directly (as in `http://localhost:8080/testimonial/`).
  But if we go to the home page, the navigation to `About`, for example,
  doesn't work (link is http://localhost:8080/about.html) and we get an error: `Cannot GET /about.html`.
- Edit the base template and
  - Remove links we're not using
  - Correct links by making them relative to root and without the `.html` extension
- Comment out search form. TODO implement search functionality.
- Parameterize title content for each page in base template

## Reusable Content Template

## Collections

## Custom Homepage

## Deployment

## API Based Contact Page

## CMS

## Automation
