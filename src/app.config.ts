export default defineAppConfig({
  pages: [
    'pages/account/index',
    'pages/trending/index',
    'pages/topics/index',
    'pages/schedule/index',
    'pages/review/index'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '选题管家',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#94a3b8',
    selectedColor: '#6366f1',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/account/index',
        text: '账号定位'
      },
      {
        pagePath: 'pages/trending/index',
        text: '热点观察'
      },
      {
        pagePath: 'pages/topics/index',
        text: '选题池'
      },
      {
        pagePath: 'pages/schedule/index',
        text: '拍摄排期'
      },
      {
        pagePath: 'pages/review/index',
        text: '发布复盘'
      }
    ]
  }
})