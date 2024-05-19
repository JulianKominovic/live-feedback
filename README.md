
![Github frame](https://github.com/JulianKominovic/live-feedback/assets/70329467/2875d98c-6930-48f7-b047-77756411a38e)
# Live feedback

Live feedback is an extension made for Google Chrome browser that allows you to get feedback on your website in real time from your developers, designers, and clients. It is a simple and easy-to-use tool that helps you to improve your website by getting feedback from your team.

In 3 simple steps you can get feedback on your website:

- Install the extension
- Create a Github Token
- Configure the extension
- Start giving feedback

## Demo


https://github.com/JulianKominovic/live-feedback/assets/70329467/f10718b1-272d-42d3-8556-ac4043e2ce89




## Instructions
### Download extension
1. Go to releases of this repo.
2. Download the latest .zip.
3. Extract the content into a single folder.
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/449c2df8-133e-47c3-8182-921618412abb)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/f3d89d5f-f0d7-4fe7-8a59-dbd3b8fea2ea)

### Install extension
1. Go to chrome://extensions/
2. Enable 'Developer Mode'
3. Click on 'Load unpacked'
4. Select the folder where you extracted the .zip from the latest release in the previous step.

![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/5079944f-8c58-430d-b271-c28a23aa2b21)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/e91f042a-35c6-482c-9a26-aca40762e573)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/7d7ec533-1122-4c66-946e-b01488211b7f)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/e7cdac9d-6746-4f23-8ba5-edb080107b26)

### Configurations
At the moment, you have the extension installed and pinned.
Live feedback relies on Github to work, because of that we are going to need a Github Token.
Don't worry, your token is safe, you can see every request Live Feedback makes in the 'Network panel' inside Chrome Dev Tools.


1. Create a Github Token.
2. Insert it in the extension.
3. Write the github repository where issues with the feedback will be created.
4. Write the github owner of the repository.
5. You can disabled/enable anytime you want. I encourage you to keep it disable unless you are going to use it.

![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/44c5d8c6-0219-42ea-a8e4-d6e5210a0e3f)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/771a1173-724b-42cc-9431-9e1a2fbc8ad5)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/993e4655-7085-49bc-b7a5-1cce2201014f)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/3c5eb14b-031f-4325-b861-13b137cccb98)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/d911ea05-2619-4b65-a860-bae0088b4f90)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/23425b61-25fc-41f7-81dc-54b526ecbbde)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/7425a6e4-4b11-47d2-acd8-c1a77bf8b43f)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/4bcef3d5-3698-4c66-bd1d-4f5cff0b64a4)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/cdfab1bf-bd0a-447a-b832-f90202b6f8b6)
![image](https://github.com/JulianKominovic/live-feedback/assets/70329467/13e27fd1-13be-43f2-8d3f-f3ee44e1a6db)

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
