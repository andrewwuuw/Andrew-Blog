const path = require("path");

module.exports = {
  title: "Andrew's Blog",
  
  description: 'Learning Swift!',

  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog

  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': process.env.GA
      }
    ],
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
        publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
      }
    ]
  ],
  
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',

    directories: [
      {
        id: "tw",
        dirname: "_tw",
        title: "文章",
        path: "/tw/",
        itemPermalink: "/tw/:year/:month/:day/:slug",
      }
    ],

    nav: [
      {
        text: '文章',
        link: '/tw/',
      },
      {
        text: '標籤',
        link: '/tag/',
      },
    ],

    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/andrewwuuw"
        },
        {
          type: "mail",
          link: "mailto:secret8419@gmail.com"
        }
      ],
      copyright: [
        {
          text: "Andrew Wu © 2020",
          link: "/"
        }
      ]
    },

    globalPagination: {
      lengthPerPage: 10,
    },

    sitemap: {
      hostname: 'https://andrewwuu.com/'
    },

    comment: {
      service: 'disqus',
      shortname: 'andrewwuuw-blog',
    },

    feed: {
      canonical_base: 'https://andrewwuu.com/',
    },

    paginationComponent: 'SimplePagination',

    smoothScroll: true
  },
  alias: {
    "@assets": path.resolve(__dirname, "../assets")
  }
}
