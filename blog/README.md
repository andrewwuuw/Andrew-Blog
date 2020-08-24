---
title: About Me
---
<template>
  <h1 class="beginning"> This is Andrew </h1>
  
  I was born on June 19, 1997 in Ilan, graduated from NTUB.
  
  I'll try to Write some notes about learning Swift, iOS and the other technology, feel free to give your comments, Your comments and suggestions are welcome!

  At your convenience, there is [Andrew Blog GitHub](https://github.com/andrewwuuw/Andrew-Blog), send the [Issues](https://github.com/andrewwuuw/Andrew-Blog/issues) to discuss together.

  <div class="start">
    <router-link to="/tw/">GO</router-link>
  </div>
</template>

<style lang="stylus" scoped>
.start
  margin 50px 0
  > a
    text-decoration none
    font-size 1.2rem
    border 1px solid
    padding 0.8rem 1.6rem
    border-radius 10px
    transition 0.1s ease
    box-sizing border-box
  @media (max-width: $MQMobile)
    display flex
    justify-content center
p
  font-size 20px
@media (max-width: $MQMobile)
  .beginning
    margin-top 0 !important
    text-align center
</style>