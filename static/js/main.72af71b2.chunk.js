(this.webpackJsonplifegame=this.webpackJsonplifegame||[]).push([[0],{13:function(e,t,n){},8:function(e,t,n){"use strict";n.r(t);var s=n(3),l=n(4),a=n(6),r=n(5),i=n(1),c=n.n(i),o=n(7),u=n.n(o),h=(n(13),n(0));function d(e){var t=1===e.value?"alive":"dead";return Object(h.jsx)("td",{className:t,onClick:e.onClick,onContextMenu:e.onContextMenu,onMouseEnter:e.onMouseEnter})}var f=function(e){Object(a.a)(n,e);var t=Object(r.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"renderCell",value:function(e){var t=this;return Object(h.jsx)(d,{value:this.props.cells[e],onClick:function(){return t.props.onClick(e)},onContextMenu:function(n){return t.props.onContextMenu(n,e)},onMouseEnter:function(n){return t.props.onMouseEnter(n,e)}},e)}},{key:"render",value:function(){for(var e=Math.sqrt(this.props.cells.length),t=[],n=0;n<e;n++){for(var s=[],l=0;l<e;l++)s.push(this.renderCell(n*e+l));t.push(Object(h.jsx)("tbody",{children:Object(h.jsx)("tr",{className:"cellRow",children:s},n)},n))}return Object(h.jsx)("table",{className:"cells",children:t})}}]),n}(c.a.Component),v=function(e){Object(a.a)(n,e);var t=Object(r.a)(n);function n(e){var l;Object(s.a)(this,n);return(l=t.call(this,e)).state={cells:Array(Math.pow(55,2)).fill(0),bRules:[3],sRules:[2,3],isPlaying:!1},l}return Object(l.a)(n,[{key:"randomizeCells",value:function(){var e=this.state.cells.map((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5;return Math.random()<n?e:t}(0,1,.8)}));this.setState({cells:e})}},{key:"updateCells",value:function(){for(var e=this,t=this.state.cells.length,n=Math.sqrt(t),s=[-n-1+t,-n+t,1-n+t,-1+t,1,n-1,n,n+1],l=Array(t).fill(0),a=function(n){var a=s.map((function(s){return e.state.cells[(n+s)%t]})).reduce((function(e,t){return e+t})),r=1===e.state.cells[n]?e.state.sRules:e.state.bRules;l[n]=Number(r.includes(a))},r=0;r<t;r++)a(r);this.setState({cells:l})}},{key:"togglePlay",value:function(){var e=this,t=!this.state.isPlaying;this.setState({isPlaying:t}),t?this.timerID=setInterval((function(){return e.updateCells()}),120):clearInterval(this.timerID)}},{key:"setCell",value:function(e,t){var n=this.state.cells.slice();n[e]=t,this.setState({cells:n})}},{key:"handleClick",value:function(e){this.setCell(e,1)}},{key:"handleRightClick",value:function(e,t){e.preventDefault(),this.setCell(t,0)}},{key:"handleMouseEnter",value:function(e,t){var n=e.buttons;n%2===1?this.setCell(t,1):2===n&&this.setCell(t,0)}},{key:"render",value:function(){var e=this,t="B: ".concat(this.state.bRules.join(", ")," / S: ").concat(this.state.sRules.join(", "));return Object(h.jsxs)("div",{className:"game",children:[Object(h.jsx)("div",{className:"game-board",children:Object(h.jsx)(f,{cells:this.state.cells,onClick:function(t){return e.handleClick(t)},onContextMenu:function(t,n){return e.handleRightClick(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)}})}),Object(h.jsxs)("div",{className:"game-info",children:[Object(h.jsx)("div",{children:t}),Object(h.jsx)("button",{className:"play-button",onClick:function(){return e.togglePlay()},children:this.state.isPlaying?"Pause":"Play"}),Object(h.jsx)("button",{className:"random-button",onClick:function(){return e.randomizeCells()},children:"Random"})]})]})}}]),n}(c.a.Component);u.a.render(Object(h.jsx)(v,{}),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.72af71b2.chunk.js.map