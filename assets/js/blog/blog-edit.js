

const blog_edit = new Vue({
	el: 'main',
	data: {
	}
});


for (var keys in blog) {
	if (blog.hasOwnProperty(keys)) {
		var form_el = document.getElementById(keys);
		if (form_el !== null) {
			if ((form_el.nodeName == 'INPUT') && (form_el.type == 'text')) {
				form_el.value = blog[keys];
			}
			if ((form_el.nodeName == 'INPUT') && (form_el.type == 'number')) {
				form_el.value = blog[keys];
			}
			if ((form_el.nodeName == 'INPUT') && (form_el.type == 'url')) {
				form_el.value = blog[keys];
			}
			if ((form_el.nodeName == 'INPUT') && (form_el.type == 'file')) {
				var file = 'hidden_' + form_el.getAttribute('id');
				document.getElementById(file).value = blog[keys];
			}
			if ((form_el.nodeName == 'SELECT') && (form_el.type == 'select-one')) {
				let select_val = blog[keys].toString();
				form_el.value = select_val.replace(/&#x2F;/g, '/');
			}
			if ((form_el.nodeName == 'TEXTAREA') && (form_el.type == 'textarea')) {
				form_el.value = blog[keys];
			}
		}
	}
}

