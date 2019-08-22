var $form;
var formValidateInit = function (id,func,fields){
	$form = $('#'+id);
	$form.bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: fields
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		var $form = $(e.target);
		var bv = $form.data('bootstrapValidator');
		func();
//		$.post($form.attr('action'), $form.serialize(), function(json) {
//			func(json);
//		}, 'json');
	});
}

var initField = {
	fieldName: {
		message: '验证不成功',//group: '.col-lg-4'
		validators: {
			notEmpty: {//非空
				message: '不能为空'
			},
			stringLength: {//字符串长度
				min: 6,
				max: 30,
				message: '字符串长度需在6到30之间'
			},
			remote: {
				url: '',//返回{"valid":false}表示不合法，验证不通过;{"valid":true}表示合法，验证通过
				message: '验证失败'
			},
			regexp: {//正则表达式
				regexp: /^[a-zA-Z0-9_\.]+$/,
				message: '验证失败'
			},
			emailAddress: {//邮箱验证
				message: '验证失败'
			},
			choice: {//多选
				min: 2,
				max: 4,
				message: '需选择两到四个选项'
			},
			stringCase: {//字符串类型
				message: '必须包含upper类型的字符串',
				'case': 'upper'
			},
			different: {
				field: 'password',
				message: '必须和password不一致'
			},
			date: {
				format: 'YYYY/MM/DD',
				message: '日期格式验证失败'
			},
			digits: {
				message: '必须只能包含数字'
			},
			identical: {
				field: 'confirmPassword',
				message: '必须和confirmPassword一致'
			},
			greaterThan: {
				value: 18,
				message: '必须比18大'
			},
			lessThan: {
				value: 100,
				message: '必须比100小'
			},
			phone: {
				country: 'US',
				message: '电话号码格式不正确'
			},
			uri: {
				allowLocal: true,
				message: 'url不正确'
			},
			color: {
				type: ['hex', 'rgb', 'hsl', 'keyword'],
                message: '颜色不正确'
			},
			zipCode: {
				country: 'US',
				message: 'zip code不正确'
			},
			numeric: {
                message: '只允许数字'
            },
            callback: {
            	message: '验证失败',
            	callback: function(value, validator) {
            		return true;
            	}
            },
            creditCard: {
            	message: 'creditCard不正确'
            },
            cvv: {
            	message: 'The value is not a valid CVV',
                creditCardField: 'ccNumber'
            },
            file: {
                extension: 'pdf',
                type: 'application/pdf',
                minSize: 1024*1024,
                maxSize: 10*1024*1024,
                message: 'Please choose a pdf file with a size between 1M and 10M.'
            }
		}
	}
}