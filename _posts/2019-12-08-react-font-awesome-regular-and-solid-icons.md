---
layout: post
title: 'React Font Awesome regular and solid icons '
tags:
  - react
  - font-awesome
  - icon
comments: true
---

For example, if a like button has the heart icon, I want to toggle it between the [regular](https://fontawesome.com/icons/heart?style=regular) and [solid](https://fontawesome.com/icons/heart?style=solid) based on the like status.

## Install [react-fontawesome](https://github.com/FortAwesome/react-fontawesome)

- Follow the instructions in the [readme](https://github.com/FortAwesome/react-fontawesome#installation)
- Make sure that both `@fortawesome/free-solid-svg-icons` and `@fortawesome/free-regular-svg-icons` are installed.

```sh
# Install the library core.
$ yarn add @fortawesome/react-fontawesome
$ yarn add @fortawesome/fontawesome-svg-core
```

```sh
# Install necessary icons.
$ yarn add @fortawesome/free-solid-svg-icons
$ yarn add @fortawesome/free-regular-svg-icons
```

## Find icons

- Find icons in [Font Awesome Icon Gallery](https://fontawesome.com/icons?d=gallery)
- There are [two plans](https://fontawesome.com/plans): Free and Standard (Pro)

## Find icon constant names for JS use

- Consult this: https://github.com/FortAwesome/Font-Awesome/tree/master/js-packages/%40fortawesome

## React

### Import the `FontAwesomeIcon` component

```js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
```

### Import icon

- Both `@fortawesome/free-solid-svg-icons` and `@fortawesome/free-regular-svg-icons` contains the same icon names so I [aliased imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to avoid naming colision.

```js
import { faHeart as faHeartActive } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartInactive } from '@fortawesome/free-regular-svg-icons';
```

If there is no naming collision, it is simple.

```js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
<FontAwesomeIcon icon={faGithub} />;
```

### Example component

```jsx
import React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartActive } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartInactive } from '@fortawesome/free-regular-svg-icons';

const likeIcon = (liked) => (liked ? faHeartActive : faHeartInactive);

const ExampleLikeableCard = ({
  name,
  explanation,
  liked,
  likeCount,
  className = '',
}) => {
  const iconStyle = { color: liked ? 'red' : 'inherit' };
  return (
    <Card className={className}>
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardText>{explanation}</CardText>

        <Button outline>
          <FontAwesomeIcon
            icon={likeIcon(liked)}
            fixedWidth={true}
            style={iconStyle}
          />
          <span className="ml-1">{likeCount}</span>
        </Button>
      </CardBody>
    </Card>
  );
};

export default ExampleLikeableCard;
```

That's it.
