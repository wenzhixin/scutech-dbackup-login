<template>
  <div id="app">
    <BootstrapTable
      ref="table"
      :options="options"
      :columns="columns"
      :data="data"
      @on-check="onCheck"
      @on-uncheck="onCheck"
      @on-reorder-row="onCheck"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import Utils from '@/utils'

const table = useTemplateRef('table')
const options = {
  classes: 'table table-bordered',
  height: 600,
  singleSelect: true,
  clickToSelect: true,
  reorderableRows: true,
  useRowAttrFunc: true
}
const addRow = e => {
  const $tr = $(e.target).parents('tr')
  const username = $tr.find('input[name="username"]').val()
  const password = $tr.find('input[name="password"]').val()

  if (username && password) {
    data.value.splice(data.value.length - 1, 0, {
      checked: false,
      username,
      password
    })
    Utils.setStorage(data.value)
  }
}
const cellStyle = (value, row) => row.action === 'add' && {
  classes: 'bs-checkbox' // prevent drag and drop
}
const columns = [
  {
    field: 'checked',
    checkbox: true,
    formatter: (val, row) => {
      if (row.action === 'add') {
        return {
          disabled: true
        }
      }
      return val
    }
  },
  {
    field: 'username',
    title: '用户名',
    cellStyle,
    formatter: (val, row) => Utils.createInput(val, {
      name: 'username',
      disabled: row.action !== 'add'
    })
  },
  {
    field: 'password',
    title: '密码',
    cellStyle,
    formatter: (val, row) => Utils.createInput(val, {
      name: 'password',
      disabled: row.action !== 'add'
    }),
    events: {
      'keyup input': e => {
        if (e.keyCode === 13) {
          addRow(e)
        }
      }
    }
  },
  {
    field: 'action',
    title: '操作',
    cellStyle,
    align: 'center',
    formatter: val => Utils.createLink(val || 'delete', {
      icon: val === 'add' ? 'bi-plus' : 'bi-trash'
    }),
    events: {
      'click .add': e => {
        addRow(e)
      },
      'click .delete': (e, val, row, index) => {
        data.value.splice(index, 1)
        Utils.setStorage(data.value)
      }
    }
  }
]
const data = ref([])

const onCheck = () => {
  data.value = table.value.getData()
  Utils.setStorage(data.value)
}

onMounted(async () => {
  data.value = await Utils.getStorage() || [
    {
      checked: false,
      username: '',
      password: '',
      action: 'add'
    }
  ]
})
</script>

<style>
#app {
  width: 400px;
}

.table tr.selected td {
  background-color: transparent !important;
}
</style>
