# Magento module license check

This action checks for the existence of a LICENSE.txt file in every module within a namespace

## Inputs

### `namespaces`

**Required** A commad separated list of namespaces, e.g. `app/code/Demoli,app/code/ClientNamespace`.

## Example usage

```yaml
-   name: Check licenses exist in module directories
    uses: skywire/actions-license-check@master
    with:
        namespaces: app/code/Skywire,app/code/ClientNamespace
```