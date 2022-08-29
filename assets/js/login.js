$(function() {
    // 点击去注册账号
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 添加密码框校验规则
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码输入不一致';
            }
        }
    })

    // 监听注册提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单的默认提交事件
        e.preventDefault();
        // alert(1)
        $.post('/api/reguser', {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            function(res) {
                console.log(res);

                if (res !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
                $('#link_login').click();
            })

    })

    // 监听登录提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败! ');
                }
                localStorage.setItem('token', res.token);
                layer.msg('登录成功! ');
                location.href = '/index.html'
            }
        })
    })
})