<template>
  <div>
    <h4>各部门参与人数详情</h4>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="data.type === 0">
        <div
          v-for="i in 10"
          v-bind:key="'department' + (i - 1)"
        >{{ $root.departmentList[i - 1] }}：{{ currentList[i - 1] }}</div>
      </div>
      <div v-else-if="data.type === 1">
        <div
          v-for="i in 10"
          v-bind:key="'department' + (i - 1)"
        >{{ $root.departmentList[i - 1] }}：{{ currentList[i - 1] }}/{{ memberList[i - 1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityDepartment',
  props: ['data'],
  data () {
    return {
      usedData: this.data,
      loading: true,
      memberList: [],
      currentList: []
    }
  },
  mounted () {
    this.getDepartmentInfo()
  },
  methods: {
    getDepartmentInfo () {
      var vm = this
      vm.loading = true
      vm.$http.post('/api/department.php', {
        id: vm.usedData.id
      }).then(data => {
        data = data.body
        if (!(data instanceof Object)) {
          alert('服务器发生错误')
          vm.$emit('fold')
        } else if (data.err_code) {
          alert(data.err_msg)
          vm.$emit('fold')
        } else {
          data = data.data
          if (vm.usedData.type === 1) {
            vm.memberList = data.member_list
          }
          vm.currentList = data.current_member_list
        }
        vm.loading = false
      }).catch(data => {
        alert('404！该服务暂时不可用')
        vm.loading = false
      })
    }
  }
}
</script>
