const html_template = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/tailwind.css">
    <title>{{title}}</title>
    <style>
        @page {
            size: A4 {{orientation}};
            box-sizing: border-box;
        }

        @media print {
            footer {
                page-break-after: always;
            }
        }
    </style>
    <script>
      let CSSDone = function() {setTimeout(() => { window.focus();window.print(); }, 200)} // Callback function
      let link = document.createElement('link');
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.onload = CSSDone; // CSSDone is the callback function
      link.setAttribute("href", '/tailwind.css');
      document.getElementsByTagName("head")[0].appendChild(link);
    </script>
</head>
<body class="h-full flex flex-col">
        {{content}}
</body>
</html>`;

const generatePdf = (title: string, orientation: string, content: string) => {
  let template = html_template;
  template = template
    .replace("{{title}}", title)
    .replace("{{orientation}}", orientation)
    .replace("{{content}}", content);
  const printWidow = window.open("", "_blank");
  if (!printWidow) return;
  printWidow.document.write(template);
  printWidow.addEventListener("afterprint", (e) => {
    printWidow.close();
  });
};
export default generatePdf;
