# {{ componentName }}

{{ description }}

## Props

<% if(props) { %>
| Name | Description | Type | Required | Default |
|------|-------------|------|----------|---------|
<% props.forEach(function(prop) { %>| <%= prop.name %> | <%= prop.description %> | `<%= prop.type.name %>` | <%= prop.required %> | <%= prop.defaultValue ? `\`${prop.defaultValue.value}\`` : '-' %> |
<% }) %>
<% } %>

## Events

<% if(events) { %>
| Event Name | Description | Parameters |
|------------|-------------|------------|
<% events.forEach(function(event) { %>| <%= event.name %> | <%= event.description %> | <%= event.arguments %> |
<% }) %>
<% } %>

## Slots

<% if(slots) { %>
| Name | Description | Bindings |
|------|-------------|----------|
<% slots.forEach(function(slot) { %>| <%= slot.name %> | <%= slot.description %> | <%= slot.bindings %> |
<% }) %>
<% } %> 