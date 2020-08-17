const path = require("path");
module.exports = {
  title: "Andrew's Blog",
  
  description: 'Learning Swift!',

  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog

  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-175488874-1'
      }
    ]
  ],
  
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',

    directories: [
      {
        id: "article",
        dirname: "_article",
        path: "/article/",
        itemPermalink: "/article/:slug",
      }
    ],

    nav: [
      {
        text: 'Article',
        link: '/article/',
      },
      {
        text: 'Tags',
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
          link: ""
        }
      ]
    },

    globalPagination: {
      lengthPerPage: 10,
    },

    sitemap: {
      hostname: 'https://andrewwupp.site/'
    },

    comment: {
      service: 'disqus',
      shortname: 'andrewwuuw-blog',
    },

    feed: {
      canonical_base: 'https://andrewwupp.site/',
    },

    paginationComponent: 'SimplePagination',

    smoothScroll: true
  },
  alias: {
    "@assets": path.resolve(__dirname, "../assets")
  }
}
