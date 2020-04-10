/*
 * @Author: Wuxiaohong (wxh1220@gmail.com)
 * @Date: 2020-04-08 12:54:43
 * @Last Modified by: Wuxiaohong
 * @Last Modified time: 2020-04-10 23:44:15
 * @功能:
 * @简介: vue 查找组件的方法
 */

/**
 * 由一个组件，向上找到最近的指定组件
 * @param {VueComponent} context 查询开始组件
 * @param {string} componentName 组件名称
 * @returns {any} VueComponent 组件实例
 */
export function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

/**
 * 由一个组件，向上找到所有的指定组件
 * @param {VueComponent} context 查询开始组件
 * @param {string} componentName 组件名称
 * @returns {array} Array<VueComponent>
 */
export function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}

/**
 * 由一个组件，向下找到最近的指定组件
 * @param {VueComponent} context 查询开始组件
 * @param {string} componentName 组件名称
 * @returns {any} VueComponent 组件实例
 */
export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;

      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}

/**
 * 由一个组件，向下找到所有指定的组件
 * @param {VueComponent} context 查询开始组件
 * @param {string} componentName 组件名称
 */
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}


/**
 * 由一个组件，找到指定组件的兄弟组件
 * @param {VueComponent} context 查询开始组件
 * @param {string} componentName 组件名称
 * @param {boolean} exceptMe 是否抛开自己
 */
export function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

/**
 * 返回随机范围整数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export function randomNumber(min = 0, max = min + 1) {
  const { random, floor } = Math
  return floor(random() * (max - min + 1) + min)
}

/**
 * 返回随机颜色
 * @param {number} digit 颜色位
 */
export function randomColor(digit = 6, unit) {
  return (unit || '') + Math.random().toString(16).slice(-digit);
}