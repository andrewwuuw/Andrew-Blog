const path = require("path");
const feed_options = {
  canonical_base: 'https://andrewwuu.com',
  feeds: {

    rss2: {
      enable    : false,
    },

    // -------------------------------------------------------------------------

    atom1: {
      enable    : true,
      file_name : 'feed.atom',
      head_link : {
        enable: true,
        type  : 'application/atom+xml',
        title : '%%site_title%% Atom Feed',
      }
    },

  },
};

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
    ],
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
        url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
        publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
      }
    ],
    [
      'feed', feed_options
    ]
  ],
  
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',

    directories: [
      {
        id: "article",
        dirname: "_article",
        path: "/article/",
        itemPermalink: "/article/:year/:month/:day/:slug",
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
      hostname: 'https://andrewwuu.com/'
    },

    comment: {
      service: 'disqus',
      shortname: 'andrewwuuw-blog',
    },

    paginationComponent: 'SimplePagination',

    smoothScroll: true
  },
  alias: {
    "@assets": path.resolve(__dirname, "../assets")
  }
}
