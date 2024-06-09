
![Github frame (2)](https://github.com/JulianKominovic/live-feedback/assets/70329467/074b2b42-61a6-452e-8dbe-5b359cae46ec)

# Live feedback

Live feedback is a script you can inject on your site that allows you to get feedback on your website in real time from your developers, designers, and clients. 
It is a simple and easy-to-use tool that helps you to improve your website by getting feedback from your team.
Integration is really simple.

In a few steps you can get feedback on your website:

- Add Live Feedback script in your website
- Pass some mandatory properties to the script such as `repo` and `owner`
- Live Feedback is now enable on your website.
- You will see the `Login` button, click it.
- After giving Live Feedback access to your repositories you can start giving feedback.


## Demo



https://github.com/JulianKominovic/live-feedback/assets/70329467/b6847ac8-128a-4bd9-8fe4-46280fa1533e






## Instructions
### Add script tag
Add this script at the end of `<body>` tag.
```html
 <script
  repo="{your repo}"
  owner="{repo owner}"
  async
  src="https://cdn.jsdelivr.net/gh/JulianKominovic/live-feedback@latest/build/bundle.js"
/>
```

i.e:
```html
 <script
  repo="live-feedback"
  owner="JulianKominovic"
  async
  src="https://cdn.jsdelivr.net/gh/JulianKominovic/live-feedback@latest/build/bundle.js"
/>
```


### We are ready!
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/64d1d32c-e1e8-4544-8a05-edfb1980b04a)

Check the issue this example has created: https://github.com/JulianKominovic/live-feedback/issues/74

## Features

### Github integration

Live feedback integrates with Github to provide you with a seamless experience.

You can easily create issues on your Github repository directly from the feedback you receive on your website.

When you create a thread on your website, it automatically creates an issue on your Github repository with your initial message and a screenshot of the page where the feedback was given in the description among other details which makes it easier for your team to understand the feedback and work on it.

### Dom Awareness

Live feedback is aware of the DOM structure of your website.

When you create a thread, it automatically captures the DOM element, extracting some of its properties like:

- Css Selector
- Visibility related properties
- Position related properties

and attaches them to the issue created on Github along with contextual information like the URL of the page where the feedback was given.

Tracking is the most valuable feature of Live feedback. It allows you to see the exact element that the feedback is referring to, which makes it easier for your team to understand the feedback and work on it.

> Tracking calculations are propense to errors, although I haven't experience any, it is possible that the element tracked is not the one you intended to track or that the element is not tracked at all so you will not be able to see the thread bubble.
