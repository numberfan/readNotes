
/**
 * Created by chenfan on 2017/7/5.
 */
/**
 * 表单数据验证
 * @param policy 验证策略
 * 使用：
 * 1.编写策略
 * var VerifiPolicy = {
        isNonEmpty: function(value, errorMsg) {
            return value === '' ? errorMsg : 0
        }
    };
 *2.创建表单验证实例
 * var validator = new Validator();
 *3.编写校验配置
 * validator.add(registerForm.userName, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空！'
    }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能小于6位！'
    }])
 *4.开始校验
 * var errorMsg = validator.start()
 * 5.错误信息处理
 * if(errorMsg){
		alert(errorMsg)
		return false//阻止表单提交
	}
 */

var VerifiPolicy = {

    //数据最小长度限制
    minLength: function(value, length, errorMsg) {
        return value.length < length ? errorMsg : 0
    },

    //不为空
    isNonEmpty: function(value, errorMsg) {
        return value === '' ? errorMsg : 0
    },

    //手机号码
    isMoblie: function(value, errorMsg) {
        return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ? errorMsg : 0
    },

    //邮件
    isEmail: function(value, errorMsg) {
        return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ? errorMsg : 0
    }
};

//验证方法
function Validator(policy) {
    this.cache = [];        //保存验证规则
    this.policy = policy;   //策略对象
}

Validator.prototype.add = function (dom, rules) {

    for (var i = 0, len = rules.length; i < len; i++) {
        var _rule = rules[i];
        var strategyArr = _rule.strategy.split(":"); //处理strategy: 'minLength : 6',
        var errorMsg = _rule.errorMsg;

        var strategy = strategyArr.shift().replace(/(^\s*)|(\s*$)/g, ''); //数据检测的函数名（去除首尾空格）
        strategyArr.unshift(dom.value);     //DOM值
        strategyArr.push(errorMsg);        //错误提示

        var value = this.policy[strategy].apply(dom, strategyArr); //调用检测输入函数
        this.cache.push(value);
    }
};

Validator.prototype.start = function () {

    for (var i = 0, len = this.cache.length; i < len; i++) {
        if (this.cache[i] !== 0) {
            return this.cache[i];
        }
    }

    return 0;
};

//调用
var formELe = document.querySelector("#myform");

document.querySelector(".btn").onclick = function () {

    var validate = new Validator(VerifiPolicy);
    validate.add(formELe.username, [
        {
            strategy: 'isNonEmpty',
            errorMsg: '用户名不能为空！'
        },
        {
            strategy: 'minLength:6',
            errorMsg: '用户名长度不能小于6位！'
        }
    ]);
    validate.add(formELe.tel, [
        {
            strategy: 'isNonEmpty',
            errorMsg: '手机号码不能为空！'
        },
        {
            strategy: "isMoblie",
            errorMsg: "手机号码格式错误"
        }
    ]);
    console.log("检测结果值：" + validate.start())
};


