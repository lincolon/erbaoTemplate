<template>
  <el-form :inline="true" size="mini" ref="searchBar" :model="searchConfig.data">
    <template v-for="(value, key) in searchConfig.config">
      <el-form-item
        :key="key"
        v-if="value.type !== 'double'"
        :label="value.label"
        :prop="value.prop ? value.prop : ''"
        :rules="value.prop && value.rules ? value.rules : null">
        <el-input
          v-if="value.type === 'input' && value.inputType !== 'num'"
          :class="value.class ? value.class : ''"
          :type="value.inputType ? value.inputType : 'text'"
          v-model="searchConfig.data[key]">
        </el-input>
        <el-input
          v-if="value.type === 'input' && value.inputType === 'num'"
          :class="value.class ? value.class : ''"
          :type="value.inputType ? value.inputType : 'text'"
          v-model.number="searchConfig.data[key]">
        </el-input>
        <el-select
          v-if="value.type === 'select'"
          :class="value.class ? value.class : ''"
          v-model="searchConfig.data[key]">
          <el-option v-for="(item, index) in value.options" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-date-picker
          v-if="value.type === 'time'"
          :class="value.class ? value.class : ''"
          v-model="searchConfig.data[key]"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <div class="el-form-double" v-if="value.type === 'double'" :key="key">
        <div class="double-wrapper">
          <div class="double-item" v-for="(item, index) in value.contains" :key="index">
            <el-form-item
              :label="index === 0 ? value.label : ''"
              :prop="item.prop ? item.prop : ''"
              :rules="item.prop && item.rules ? item.rules : null">
              <el-input
                v-if="item.type === 'input' && item.inputType !== 'num'"
                :class="item.class ? item.class : ''"
                :type="item.inputType ? item.inputType : 'text'"
                v-model="searchConfig.data[item.name]">
              </el-input>
              <el-input
                v-if="item.type === 'input' && item.inputType === 'num'"
                :class="item.class ? item.class : ''"
                v-model.number="searchConfig.data[item.name]">
              </el-input>
              <el-select
                v-if="item.type === 'select'"
                :class="item.class ? item.class : ''"
                v-model="searchConfig.data[item.name]"
                @change="item.change ? item.change(searchConfig) : null">
                <el-option v-for="(i, idx) in item.options" :key="idx" :label="i.label" :value="i.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
    </template>
    <el-form-item>
      <el-button @click.stop="reset">重置</el-button>
      <el-button type="primary" @click.stop="search">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: ['searchConfig'],
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods: {
      transTime (timeArr) {
        if (!timeArr) return null
        return timeArr.map((v, i) => {
          if (v) {
              return parseInt((new Date(v)).getTime()/1000).toString()
          } else {
              return null
          }
        })
      },
      transData () {
        let data = this.searchConfig && this.searchConfig.data ? JSON.parse(JSON.stringify(this.searchConfig.data)) : {}
        for (const key in data) {
          if (data.hasOwnProperty(key) && this.searchConfig.config.hasOwnProperty(key) && this.searchConfig.config[key].type === 'time') {
            data[key] = this.transTime(data[key])
          }
        }
        return data
      },
      reset () {
        this.$refs.searchBar.resetFields()
        this.searchConfig.data = this.searchConfig.resetData
        this.$emit('reset')
      },
      search () {
        this.$emit('search', this.transData())
      }
    }
  }
</script>
