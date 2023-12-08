<template>
  <div
    class="slide-right-fade-in-btn"
    :class="[
      { 'slide-right-fade-in-btn--static': staticBtn },
      'slide-right-fade-in-btn--' + size,
      'slide-right-fade-in-btn--' + type,
    ]"
  >
    <button @click="$emit('buttonClick')" class="slide-right-fade-in-btn__btn">
      <span class="slide-right-fade-in-btn__text"><slot></slot></span>
    </button>
    <button class="slide-right-fade-in-btn__btn-fake">
      <span class="slide-right-fade-in-btn__text"><slot></slot></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AnimatedButton",
  setup() {},
  props: {
    staticBtn: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md",
    },
    type: {
      type: String,
      default: "add",
    },
  },
  emits: ["buttonClick"],
};
</script>

<style lang="scss">
.slide-right-fade-in-btn {
  position: relative;

  &--add,
  &--remove {
    .slide-right-fade-in-btn__btn {
      &::before,
      &::after {
        content: "";
        position: absolute;
        z-index: 0;
        background: #000;
      }
    }
  }

  &--add {
    .slide-right-fade-in-btn__btn {
      &::before {
        transform: rotate(90deg);
      }
    }
  }
  &--remove {
    .slide-right-fade-in-btn__btn {
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }

  &--xs {
    .slide-right-fade-in-btn {
      &__btn,
      &__btn-fake {
        font-size: .75rem;
        line-height: .9375rem;
        padding: .0625rem .25rem .0625rem 1.0625rem;
        border-radius: .5625rem;
      }
      &__btn {
        width: 1.0625rem;
        box-shadow: 0 0 .5rem 0 rgba(0, 0, 0, 0.1);
      }
    }
    &.slide-right-fade-in-btn--add,
    &.slide-right-fade-in-btn--remove {
      .slide-right-fade-in-btn__btn {
        &::before,
        &::after {
          width: .5624rem;
          height: .0625rem;
          top: .5rem;
          left: .25rem;
        }
      }
    }
  }
  &--md {
    .slide-right-fade-in-btn {
      &__btn,
      &__btn-fake {
        font-size: .875rem;
        line-height: 1.1875rem;
        padding: .1875rem .5rem .1875rem 1.5625rem;
        border-radius: .8125rem;
      }
      &__btn {
        width: 1.5625rem;
        box-shadow: 0 0 .75rem 0 rgba(0, 0, 0, 0.1);
      }
    }
    &.slide-right-fade-in-btn--add,
    &.slide-right-fade-in-btn--remove {
      .slide-right-fade-in-btn__btn {
        &::before,
        &::after {
          width: .8125rem;
          height: .0625rem;
          top: .75rem;
          left: .375rem;
        }
      }
    }
  }
  &--lg {
    .slide-right-fade-in-btn {
      &__btn,
      &__btn-fake {
        padding: .375rem .5rem .375rem 2rem;
        border-radius: 1rem;
      }
      &__btn {
        width: 2rem;
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
      }
    }
    &.slide-right-fade-in-btn--add,
    &.slide-right-fade-in-btn--remove {
      .slide-right-fade-in-btn__btn {
        &::before,
        &::after {
          width: 1rem;
          height: .125rem;
          top: .9375rem;
          left: .5rem;
        }
      }
    }
  }

  &--xs,
  &--md,
  &--lg {
    .slide-right-fade-in-btn {
      &__btn {
        padding-right: 0;
      }
    }
  }

  &__btn,
  &__btn-fake {
    display: block;
    white-space: nowrap;
  }

  &__btn {
    position: absolute;
    text-align: left;
    background: #fff;
    overflow: hidden;
    z-index: 0;
    transition: width 0.3s 0.3s, z-index 0s 0.6s;
  }

  &__btn:hover,
  &--static &__btn {
    width: 100%;
    z-index: 1;
    transition: width 0.3s;

    .slide-right-fade-in-btn__text {
      opacity: 1;
      transition: opacity 0.3s 0.3s;
    }
  }

  &__btn-fake {
    visibility: hidden;
  }

  &__text {
    opacity: 0;
    transition: opacity 0.3s;
  }
}
</style>
