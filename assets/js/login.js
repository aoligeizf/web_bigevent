$(function () {
  // 点击 去注册账号 的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击 去登录 的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 从layui中获取form对象
  var form = layui.form
  // 导入layer
  var layer = layui.layer
  // 通过form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个焦作pwd的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败， 则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }

    }
  })
  // 监听提交事件 注册
  $('#form_reg').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    // 发起Ajax的post请求
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 调用layer.msg()提示消息：
        layer.msg('注册成功，请登录！')
        // 模拟人的点击行为
        $('#link_login').click()
      }
    })
  })
  // 监听提交事件 登录
  $('#form_login').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault()
    
    $.ajax({
      type: 'POST',
      url: '/api/login',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功后的token字符串，保存到localStorage中
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })



})