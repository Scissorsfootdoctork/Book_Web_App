// 函数提升
function f() {
    console.log('2')
}

// 变量提升

var f

// 执行

var f = function() {
    console.log('1')
}

// 覆盖

console.log('2')






var f = function() {
    console.log('1')
}

function f() {
    console.log('2')
}