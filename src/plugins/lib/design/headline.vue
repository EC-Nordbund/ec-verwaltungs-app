<template>
  <span v-primary style="font-size: 2.2em !important;" class="headline" v-bind="$attrs" v-on="$listeners">
    <slot/>
  </span>
</template>