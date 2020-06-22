/**
 * The NavigationItem base class.
 * Used for the global navigation (sidebar/header)
 * @since 21.06.2020
 * @author Kevin Mattutat (kevin.mattutat@spaceparrots.de)
 */
export class NavigationItem {
  title: string;
  route: string;
  iconName: string;
  children: NavigationItem[];

  // Switches to determine the menu location
  private $sidebar: boolean;
  private $toolbar: boolean;

  /**
   * NavigationItem constructor
   * @param title display name
   * @param route navigation route
   * @param iconName display icon
   * @param children dropdown menu items
   */
  constructor(title: string,
              route: string,
              iconName: string = null,
              children: NavigationItem[] = null) {
    this.title = title;
    this.route = route;
    this.iconName = iconName;
    this.children = children;
    this.$sidebar = false;
    this.$toolbar = false;
  }

  /**
   * Gets child items or null
   * @see hasChildren
   * @return items or null
   */
  public getChildren(): NavigationItem[] | null {
    return this.children;
  }

  /**
   * Checks if the navigation item has children
   * @return true if navigation item has children
   */
  public hasChildren(): boolean {
    return this.children != null && this.children.length > 0;
  }

  /**
   * Appends a child navigation item
   * @param child item
   * @return parent navigation item instance
   */
  public appendChild(child: NavigationItem): NavigationItem {
    this.children.push(child);
    return this;
  }

  /**
   * Sets the icon of the navigation item
   * @param iconName clarity icon name
   * @return parent navigation item instance
   */
  public setIcon(iconName: string): NavigationItem {
    this.iconName = iconName;
    return this;
  }

  /**
   * Enables the item getting displayed in the toolbar
   * @param enabled (default=true)
   * @return parent navigation item instance
   */
  public toolbar(enabled: boolean = true): NavigationItem {
    this.$toolbar = enabled;
    return this;
  }

  /**
   * Checks if the navigation item should be display in the toolbar
   * @return boolean expression
   */
  public isToolbar(): boolean {
    return this.$toolbar;
  }

  /**
   * Enables the item getting displayed in the sidebar
   * @param enabled (default=true)
   * @return parent navigation item instance
   */
  public sidebar(enabled: boolean = true): NavigationItem {
    this.$sidebar = enabled;
    return this;
  }

  /**
   * Checks if the navigation item should be display in the sidebar
   * @return boolean expression
   */
  public isSideBar(): boolean {
    return this.$sidebar;
  }

}
