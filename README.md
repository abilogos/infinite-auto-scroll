## install

install using npm ,yarn,pnpm etc

```
npm install infinite-auto-scroller
```

## how to use

invoke the function to an jquery element:

```
$("#auto-scroll-container").autoScroll();
```
you can pass an option object if you want:

```
$("#auto-scroll-container").autoScroll({
    scroll_dir:'right',
    gear:4,
    flex_flow: 'row',
    stop: false
});
```
## available options:

<table>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>possibel values</th>
        <th>default</th>
    </tr>
    <tr>
        <td>flex_flow</td>
        <td>string</td>
        <td>column,row</td>
        <td>row</td>
    </tr>
    <tr>
        <td>gear</td>
        <td>integer</td>
        <td>integer between 0-7 indicates the speed of the scroller</td>
        <td>4</td>
    </tr>
    <tr>
        <td>scroll_dir</td>
        <td>string</td>
        <td>'left' or 'right' for flex_flow=='row' and 'up' or 'down' for flex_flow=='column'</td>
        <td>'right' or 'down' based on the flex_flow</td>
    </tr>
    <tr>
        <td>stop</td>
        <td>boolean</td>
        <td>whether stop at the end of scrolling or not</td>
        <td>false</td>
    </tr>
</table>
