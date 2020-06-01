<template>
  <div>
    <div class="tabs is-centered is-toggle">
      <ul>
        <li @click="selectOption('Add')" :class="[{'is-active': selectedOption === 'add'}]">
          <a>
            <span class="icon is-small"><i class="fas fa-plus" aria-hidden="true"></i></span>
            <span>Add</span>
          </a>
        </li>
        <li @click="selectOption('Edit')" :class="[{'is-active': selectedOption === 'edit'}]">
          <a>
            <span class="icon is-small"><i class="fas fa-edit" aria-hidden="true"></i></span>
            <span>Edit</span>
          </a>
        </li>
        <li @click="selectOption('Delete')" :class="[{'is-active': selectedOption === 'delete'}]" >
          <a>
            <span class="icon is-small"><i class="fas fa-trash-alt" aria-hidden="true"></i></span>
            <span>Delete</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="js">
import core from '../../core/core'
  export default {
    name: "ManageMenu",
    title: "ManageMenu",
    props: { 
    },
    data: () => ({ 
      selectedOption: null
    }),
    methods: {
      selectOption(option) {
        var route = this.$route.params.asset + (option ? "/" + option.toLowerCase() : '');
        core.go('/manage/' + route)
      }
    },
    watch: {
      $route: function(newRoute) {
        this.selectedOption = newRoute.params.action;
      }
    },
  }
</script>

<style lang="scss" scoped> 

</style>