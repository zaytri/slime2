import { useReducer } from 'react'
import {
  WidgetValuesContext,
  WidgetValuesDispatchContext,
  initialState,
  widgetValuesReducer,
} from './useWidgetValues'

export default function WidgetValuesProvider({
  children,
}: React.PropsWithChildren) {
  const [widgetValues, dispatch] = useReducer(widgetValuesReducer, initialState)
  return (
    <WidgetValuesContext.Provider value={widgetValues}>
      <WidgetValuesDispatchContext.Provider value={dispatch}>
        {children}
      </WidgetValuesDispatchContext.Provider>
    </WidgetValuesContext.Provider>
  )
}
