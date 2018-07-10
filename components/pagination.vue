<template>
  <div class="page-pagination">
    <div class="page-pagination-button">
      <slot name="page-pagination-button"></slot>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageConfig.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageConfig.per"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageConfig.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      pageConfig: {
        type: Object,
        default: () => {
          return {
            page: 1,
            total: 1,
            per: 10
          }
        }
      }
    },
    methods: {
      handleSizeChange (val) {
        this.$emit('pageChange', {per: val})
      },
      handleCurrentChange (val) {
        this.$emit('pageChange', {page: val})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../assets/styles/class.less";
  .page-pagination{
    .flex;
    margin: 10px 0 20px;
    padding-right: 25px;
    .page-pagination-button{
      .flex-item;
    }
    .el-pagination{
      margin-right: 50px;
    }
  }
</style>

