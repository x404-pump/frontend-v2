export function formatDate(date: Date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const suffixes = ["st", "nd", "rd", "th"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const suffix = day >= 1 && day <= 3 ? suffixes[day - 1] : suffixes[3];
  
    return `${month} ${day}${suffix}, ${year} at ${formattedHours}:${formattedMinutes}${period}`;
  }
  
  export function timeAgo(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const diffInHours = Math.floor(diff / 1000 / 60 / 60);
    const diffInDays = Math.floor(diff / 1000 / 60 / 60 / 24);
  
    if (diffInMinutes < 1) {
      return "Just now";
    }
  
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }
  
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }
  
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  
    return formatDate(date);
  }