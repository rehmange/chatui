var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://chatbot-widget-v1.s3.amazonaws.com/index.css' + '?' + new Date().getTime();

// Create script elements for JavaScript files
var script1 = document.createElement('script');
script1.src = '//g.alicdn.com/chatui/icons/2.0.2/index.js';
script1.async = true;

var script2 = document.createElement('script');
script2.src = 'https://chatbot-widget-v1.s3.amazonaws.com/index.js' + '?' + new Date().getTime();
script2.async = true;


// Create a container to hold all elements
var container = document.createElement('div');
container.id = 'root';
container.style.position = 'fixed';
container.style.bottom = '5px';
container.style.right = '5px';
document.body.appendChild(container);

document.head.appendChild(link);
document.head.appendChild(script1);
document.head.appendChild(script2);










