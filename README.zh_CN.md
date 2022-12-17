[English](./README.md)

----

# 行程卡纪念版

## 说明
这个仓库是通信行程卡的非官方纪念版，项目载体是个小游戏

过去三年  
我们不得不带着行程卡  
相伴左右 

有的人经历了成长和迷失  
有的人收获了陪伴  
有的人得到  
也有的人失去  
有的人甚至经历了生死离别

行程卡见证了一切  
我们纪念的  
不是行程卡  
而是  
这三年

我们很高兴的看到，在过去的三天里，这个游戏已经有200万人玩过，所以我们决定开源我们的代码

谨以此代码  
为疫情  
画上一个句号  
愿国人安康

## 演示
[https://aladdin-chu.github.io/travel-card-ce](https://aladdin-chu.github.io/travel-card-ce)


## 启动服务

### 环境依赖

- nodejs: v16.15.1
- npm: v8.11.0


### 快速开始

#### 安装依赖
```bash
$ cnpm install
```

#### 本地允许
```bash
$ npm run start
```

#### 打包编译
1. 修改 `.umirc.ts` 的 `publicPath` 参数，可以改为您自己的 `url`
2. 执行编译
```bash
$ npm run build
```
3. 将`dist`文件夹内容上传到服务器

## 贡献
- [@im-oss](https://github.com/im-oss)
- [@aladdin](https://github.com/aladdin-chu)

## 致谢
- 灵感、素材、排版均来自[「第一财经」](https://mp.weixin.qq.com/s/U_Ao8BctwznDe-sKo-Vw9w)
- 城市数据来源:
  - [uiwjs/province-city-china](https://github.com/uiwjs/province-city-china)
  - [国家统计局](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/)

## 隐私说明
行程信息全部在本地处理，不联网，不收集、不存储、不分析。

## 许可证
[MIT](./LICENSE).